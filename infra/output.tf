output "static_website_url" {
  value = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
}