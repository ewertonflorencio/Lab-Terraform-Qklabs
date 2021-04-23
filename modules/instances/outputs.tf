output "instance1" {
  value       = google_compute_instance.instance1.name
  description = "Compute Engine VM Instancia 1"
}

output "instance2" {
  value       = google_compute_instance.instance2.name
  description = "Compute Engine VM Instancia 2"
}
