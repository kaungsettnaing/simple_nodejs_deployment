module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  version = "5.5.0"

  bucket = var.bucket_name
  acl    = "private"

  control_object_ownership = false
  object_ownership         = "BucketOwnerPreferred"

  tags = {
    Name        = "NodeJS Static Website Bucket"
    Environment = "Dev"
  }

}

resource "aws_cloudfront_origin_access_control" "oac_static" {
  name                              = var.oac_name
  description                       = "static website s3 Policy"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

locals {
  s3_origin_id = "s3-static-website-origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = module.s3_bucket.s3_bucket_bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac_static.id
    origin_id                = local.s3_origin_id
  }

  default_cache_behavior {
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
  enabled             = true
  default_root_object = "index.html"
}

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    sid     = "AllowCloudFrontServicePrincipal"
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${module.s3_bucket.s3_bucket_arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = module.s3_bucket.s3_bucket_id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}