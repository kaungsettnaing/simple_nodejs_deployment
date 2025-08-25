
module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  version = "5.5.0"

  bucket = var.backend_name
  force_destroy = true

  tags = {
    Name        = "NodeJS Static Website Bucket"
    Environment = "Dev"
  }

  versioning = {
    status = true
  }

  server_side_encryption_configuration = {
      rule = {
        apply_server_side_encryption_by_default = {
          sse_algorithm = "AES256"
        }
      }
  }

}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = var.backend_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}