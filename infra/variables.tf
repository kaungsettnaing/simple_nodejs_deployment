variable "region" {
  description = "Default region for provider"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "s3 bucket name for static website"
  type        = string
}