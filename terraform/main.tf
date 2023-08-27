terraform {
  required_version = ">=1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=5.0.0"
    }
  }
}

provider "aws" {
  region = var.AWS_REGION
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY

  default_tags {
    tags = {
      "Project" = "portfolio"
    }
  }
}

module "frontend" {
  source = "./modules/frontend"
}

module "vpc" {
  source = "./modules/vpc"
}