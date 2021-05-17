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
resource "google_compute_instance" "instance1" {
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

resource "google_compute_instance" "instance2" {
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

resource "google_compute_instance" "instance3" {
  name         = "tf-instance-3"
  machine_type = "n1-standard-2"
  zone         = var.zone
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
 network = "default"
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
export PROJECT="qwiklabs-gcp-01-9f614ab9225b"

export INSTANCE1="76839656765689329"
export INSTANCE2="9076288595776409073"


terraform import module.instances.google_compute_instance.instance1 76839656765689329

terraform import module.instances.google_compute_instance.instance2 9076288595776409073

terraform untaint module.instances.google_compute_instance.instance3
terraform taint module.instances.google_compute_instance.instance3


terraform {
  backend "gcs" {
    bucket  = qwiklabs-gcp-01-9f614ab9225b
    prefix  = "terraform/state"
  }
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.55.0"
    }
  }
}


module "storage" {
  source     = "./modules/storage"
}

git clone https://github.com/ewertonflorencio/Lab-Terraform-Qklabs.git

wget https://releases.hashicorp.com/terraform/0.13.6/terraform_0.13.6_linux_amd64.zip

unzip terraform_0.13.6_linux_amd64.zip

sudo mv terraform /usr/local/bin/

terraform --version 
