"use client"

import { useRef, useState, type FocusEvent, type FormEvent } from "react"
import {
  contactFormContent,
  projectTypeOptions,
  timelineOptions,
  type ContactFormValues,
} from "@/app/data/contact"
import { trackEvent } from "@/app/lib/analytics"

type FieldName = keyof ContactFormValues
type FieldErrors = Partial<Record<FieldName, string>>

function getFieldError(name: FieldName, value: string): string | undefined {
  if (name === "name" && !value.trim()) return contactFormContent.validation.requiredName
  if (name === "email") {
    if (!value.trim()) return contactFormContent.validation.requiredEmail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return contactFormContent.validation.invalidEmail
    }
  }
  if (name === "message") {
    if (!value.trim()) return contactFormContent.validation.requiredMessage
    if (value.trim().length < 20) {
      return contactFormContent.validation.shortMessage
    }
  }
  return undefined
}

function getValues(formData: FormData): ContactFormValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    projectType: String(formData.get("projectType") ?? "") as ContactFormValues["projectType"],
    timeline: String(formData.get("timeline") ?? "") as ContactFormValues["timeline"],
    message: String(formData.get("message") ?? "").trim(),
  }
}

function getErrors(values: ContactFormValues): FieldErrors {
  const errors: FieldErrors = {}
  for (const name of ["name", "email", "message"] as const) {
    const error = getFieldError(name, values[name])
    if (error) errors[name] = error
  }
  return errors
}

export function ContactForm({
  contactEmail,
  initialProjectType,
}: {
  contactEmail: string
  initialProjectType: ContactFormValues["projectType"]
}) {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const started = useRef(false)

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    const target = event.target
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return
    if (!["name", "email", "message"].includes(target.name)) return

    const field = target.name as FieldName
    const error = getFieldError(field, target.value)
    setErrors((current) => ({ ...current, [field]: error }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const values = getValues(formData)
    const fieldErrors = getErrors(values)
    setErrors(fieldErrors)
    setSubmitError("")

    const firstInvalidField = (["name", "email", "message"] as const).find(
      (field) => fieldErrors[field],
    )
    if (firstInvalidField) {
      trackEvent("form_error")
      form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus()
      return
    }

    setIsSubmitting(true)
    trackEvent("form_submit")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: String(formData.get("website") ?? "") }),
      })
      const result: unknown = await response.json().catch(() => null)
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        throw new Error("Contact form submission failed.")
      }

      trackEvent("form_success")
      setIsSuccess(true)
    } catch {
      trackEvent("form_error")
      setSubmitError(contactFormContent.failureMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="contact-form-status" role="status" aria-live="polite">
        <h3>{contactFormContent.successTitle}</h3>
        <p>{contactFormContent.successMessage}</p>
      </div>
    )
  }

  return (
    <form
      className="contact-form"
      onBlur={handleBlur}
      onFocus={() => {
        if (!started.current) {
          started.current = true
          trackEvent("form_start")
        }
      }}
      onSubmit={handleSubmit}
      noValidate
    >
      <label>
        {contactFormContent.name.label}
        <input
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          placeholder={contactFormContent.name.placeholder}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
      </label>

      <label>
        {contactFormContent.email.label}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={contactFormContent.email.placeholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
      </label>

      <label>
        {contactFormContent.company.label}
        <input
          name="company"
          autoComplete="organization"
          maxLength={160}
          placeholder={contactFormContent.company.placeholder}
        />
      </label>

      <label>
        {contactFormContent.projectType.label}
        <select name="projectType" defaultValue={initialProjectType}>
          <option value="">{contactFormContent.projectType.placeholder}</option>
          {projectTypeOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      <label>
        {contactFormContent.timeline.label}
        <select name="timeline" defaultValue="">
          <option value="">{contactFormContent.timeline.placeholder}</option>
          {timelineOptions.map((timeline) => (
            <option key={timeline} value={timeline}>{timeline}</option>
          ))}
        </select>
      </label>

      <label>
        {contactFormContent.message.label}
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={10000}
          placeholder={contactFormContent.message.placeholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
        />
        <span className="field-hint" id="message-hint">{contactFormContent.message.hint}</span>
        {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
      </label>

      <div className="contact-form-trap" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
          {contactEmail ? (
            <>
              {" "}or email us directly at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </>
          ) : (
            " later."
          )}
        </p>
      )}

      <button className="button button-dark" type="submit" disabled={isSubmitting}>
        {isSubmitting ? contactFormContent.submitting : contactFormContent.submit}
      </button>
    </form>
  )
}
