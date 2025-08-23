variable "region" {
  description = "Default region for provider"
  type        = string
  default     = "us-east-1"
}

variable "backend_name" {
  description = "S3 bucket name for Terraform backend"
  type        = string
}

variable "backend_table_name" {
  description = "DynamoDB table name for Terraform state locking"
  type        = string
  default     = "terraform_state_locking"
}