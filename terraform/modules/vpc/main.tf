resource "aws_vpc" "main" {
  cidr_block = "10.1.0.0/16"
  tags = {
    "Name" = "rbndjx-portfolio-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.1.0.0/24"
  tags = {
    "Name" = "rbndjx-portfolio-public-subnet"
  }
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.1.1.0/24"
  tags = {
    "Name" = "rbndjx-portfolio-private-subnet"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "rbndjx-portfolio-igw"
  }
}