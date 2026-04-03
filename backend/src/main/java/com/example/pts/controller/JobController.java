package com.example.pts.controller;

import com.example.pts.model.Job;
import com.example.pts.repository.JobRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*") // Allow React frontend
public class JobController {

    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {
        return jobRepository.findById(id).map(job -> {
            job.setTitle(jobDetails.getTitle());
            job.setCompany(jobDetails.getCompany());
            job.setLocation(jobDetails.getLocation());
            job.setSalary(jobDetails.getSalary());
            job.setType(jobDetails.getType());
            job.setDeadline(jobDetails.getDeadline());
            job.setEligibility(jobDetails.getEligibility());
            job.setPostedAt(jobDetails.getPostedAt());
            return jobRepository.save(job);
        }).orElseGet(() -> {
            jobDetails.setId(id);
            return jobRepository.save(jobDetails);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
    }
}
