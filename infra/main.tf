terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "nodejs_static_website" {
  bucket = "nodejs-static-website-bucket-01"

  tags = {
    Name        = "NodeJS Static Website Bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_ownership_controls" "nodejs_static_website" {
  bucket = aws_s3_bucket.nodejs_static_website.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "nodejs_static_website" {
  bucket = aws_s3_bucket.nodejs_static_website.id

  block_public_acls       = false
  block_public_policy     = true
  ignore_public_acls      = false
  restrict_public_buckets = true
}

