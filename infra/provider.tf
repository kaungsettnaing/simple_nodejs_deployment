terraform {

  backend "s3" {
    bucket         = "ksn-terraform-tf-state"
    region         = "us-east-1"
    key            = "terraform.tfstate"
    dynamodb_table = "terraform_state_locking"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=6.5.0"
    }
  }
}

provider "aws" {
  region = var.region
}