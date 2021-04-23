
variable "region" {
	default = "us-central1"
	type 	= string
}
variable "zone" {
	default = "us-central1-a"
	type    = string
}
variable "project_id" {
	default = "qwiklabs-gcp-00-e43624e04174"
	type 	   = string
}

variable "machine_type" {
	default = "n1-standard-1 "
	type 	   = string
}