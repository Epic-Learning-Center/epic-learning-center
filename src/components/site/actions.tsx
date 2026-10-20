import { Button } from "@/components/ui/button"
import { siteConfig } from "@/content/siteData"

type ActionProps = {
  children?: React.ReactNode
  variant?: "default" | "secondary" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function SignupButton({
  children = "Sign Up for Classes",
  variant = "default",
  size = "default",
  className,
}: ActionProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      nativeButton={false}
      render={
        <a
          href={siteConfig.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
        />
      }
    >
      {children}
    </Button>
  )
}

export function WhatsAppButton({
  children = "Message us on WhatsApp",
  variant = "secondary",
  size = "default",
  className,
}: ActionProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      nativeButton={false}
      render={
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        />
      }
    >
      {children}
    </Button>
  )
}
