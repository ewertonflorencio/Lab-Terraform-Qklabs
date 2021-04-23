output "storage-bucket" {
  value       = google_storage_bucket.storage-bucket.name
  description = "Backend Storage Terraform"
}
