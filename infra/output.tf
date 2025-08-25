output "static_website_url" {
  value = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
}

output "bucket_name" {
  value = "${module.s3_bucket.s3_bucket_id}"
}