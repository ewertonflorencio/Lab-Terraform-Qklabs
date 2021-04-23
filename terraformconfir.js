main.tf {

	provider "google" {
	  project     = var.project_id
	  region      = var.region
	  zone        = var.zone
	}

	module "instances" {
	  source     = "./modules/instances"
	  project_id  = var.project_id
	  region      = var.region
	  zone        = var.zone
	}


	module "storage" {
	  source     = "./modules/storage"
	  project_id  = var.project_id
	  region      = var.region
	  zone        = var.zone
	}
}
===================================

variables.tf {
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
}
====================================

modules/instances/instances.tf {
resource "google_compute_instance" "tf-instance-1" {
  name         = "tf-instance-1"
  machine_type = "n1-standard-1"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
    network = "default"
  }
}

resource "google_compute_instance" "tf-instance-2" {
  name         = "tf-instance-2"
  machine_type = "n1-standard-1"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
    network = "default"
  }
}
}
====================================

modules/instances/variables.tf {

variable "region" {
	type 	= string
}
variable "zone" {
	type    = string
}
variable "project_id" {
	type 	= string
}
}
====================================

modules/storage/storage.tf {
resource "google_storage_bucket" "storage-bucket" {
  name          = var.project_id
  location      = "US"
  force_destroy = true
  versioning    = true
  uniform_bucket_level_access = true
}
}
====================================

modules/storage/variables.tf {

variable "region" {
	type 	= string
}
variable "zone" {
	type    = string
}
variable "project_id" {
	type 	= string
}
}



######How to Import Instances#########

export ZONE="us-central1-a"
export REGION="us-central1"
export PROJECT="qwiklabs-gcp-00-e43624e04174"


terraform import google_compute_instance.tf-instance-1 projects/$PROJECT/zones/$ZONE/instances/tf-instance-1

terraform import google_compute_instance.tf-instance-2 projects/$PROJECT/zones/$ZONE/instances/tf-instance-2






