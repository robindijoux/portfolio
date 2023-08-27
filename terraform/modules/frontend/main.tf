module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.15.1"

  bucket                  = var.s3_bucket_name
  force_destroy           = true
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
  website = {
    index_document = "index.html"
    error_document = "error.html"
  }
  attach_policy = true
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "PublicReadGetObject",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : [
          "s3:GetObject"
        ],
        "Resource" : [
          "arn:aws:s3:::${var.s3_bucket_name}/*"
        ]
      }
    ]
  })
}

resource "aws_s3_object" "index" {
  bucket = module.s3-bucket.s3_bucket_id
  key    = "index.html"
  source = "${path.module}/index.html"

  etag         = filemd5("${path.module}/index.html")
  content_type = "text/html"
}

resource "aws_s3_object" "error" {
  bucket       = module.s3-bucket.s3_bucket_id
  key          = "error.html"
  source       = "${path.module}/error.html"
  etag         = filemd5("${path.module}/error.html")
  content_type = "text/html"
}