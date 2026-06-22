provider "aws" {
  region = "ap-northeast-2"
}

# 버킷 생성 파트
resource "aws_s3_bucket" "buhwalch_bucket" {
  bucket = "buhwalch-bucket"
  tags = {
    Name = "BuhwalChurch"
  }
}
# 퍼블릭 액세스 막기
resource "aws_s3_bucket_public_access_block" "buhwalch_public_access" {
  bucket = aws_s3_bucket.buhwalch_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
# 버킷 policy 적용
resource "aws_s3_bucket_policy" "buhwalch_policy" {
  bucket = aws_s3_bucket.buhwalch_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontServicePrincipal"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.buhwalch_bucket.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.buhwalch_distribution.arn
        }
      }
    }]
  })
}

# resource "aws_s3_object" "html" {
#   bucket = aws_s3_bucket.buhwalch_bucket.id
#   key    = "main.html"
#   source = "../main.html"

#   content_type = "text/html"
# }
# resource "aws_s3_object" "css" {
#   bucket       = aws_s3_bucket.buhwalch_bucket.id
#   key          = "style.css"
#   source       = "../style.css"
#   content_type = "text/css"
# }

# resource "aws_s3_object" "image_logo" {
#   bucket       = aws_s3_bucket.buhwalch_bucket.id
#   key          = "교회 로고.png"
#   source       = "../img/교회 로고.png"
#   content_type = "image/png"
# }



# CDN 파트- CDN이 접근할때 필요한 인증서(OAC)
resource "aws_cloudfront_origin_access_control" "main" {
  name                              = "s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
# aws가 만든 캐시 정책을 불러오는 data 블록
data "aws_cloudfront_cache_policy" "CachingOptimized" {
  name = "Managed-CachingOptimized"
}
#distributiuon 생성
resource "aws_cloudfront_distribution" "buhwalch_distribution" {
  origin {
    domain_name              = aws_s3_bucket.buhwalch_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.main.id
    origin_id                = "S3-Origin"
  }

  enabled             = true
  default_root_object = "index.html"
  # 도메인 연결 시 사용
  # aliases = ["mysite.${local.my_domain}", "yoursite.${local.my_domain}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Origin"

    cache_policy_id = data.aws_cloudfront_cache_policy.CachingOptimized.id
    # http 접속시 https로 redirect
    viewer_protocol_policy = "redirect-to-https"    
  }  

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "service"
  }

  viewer_certificate {
    # AWS 기본 주소랑 인증서 사용
    cloudfront_default_certificate = true
  }
}









# S3 모두 오픈하는 버킷 정책과  웹호스팅 설정 부분 삭제
# resource "aws_s3_bucket_policy" "bucket_policy" {
#   bucket = aws_s3_bucket.buhwalch-bucket.id

#   depends_on = [aws_s3_bucket_public_access_block.buhwalch-public-access]

#   policy = jsonencode({
#     Version : "2012-10-17",
#     "Statement" : [
#       {
#         Sid : "PublicReadGetObject",
#         Effect : "Allow",
#         Principal : "*",                                                  //모든 사람에게 access
#         Action : ["s3:GetObject"],                                        //getobject라는 action을 허용
#         Resource : ["arn:aws:s3:::${aws_s3_bucket.buhwalch-bucket.id}/*"] //허용히는 버킷
#       }
#     ]
#     }
#   )
# }
# 정적 웹호스팅 버킷에 설정
# resource "aws_s3_bucket_website_configuration" "buhwalch-web-config" {
#   bucket = aws_s3_bucket.buhwalch-bucket.id

#   index_document {
#     suffix = "main.html"
#   }

#   # error_document {
#   #   key = "error.html"
#   # }

#   # routing_rule {
#   #   condition {
#   #     key_prefix_equals = "docs/"
#   #   }
#   #   redirect {
#   #     replace_key_prefix_with = "documents/"
#   #   }
#   # }
# }