# Node.js Static Website CI/CD with Terraform & AWS S3
Automated pipeline provisioning infrastructure with Terraform and deploying a Node.js static build to AWS S3 using GitHub Actions.

## Project Overview
This project demonstrates a complete DevOps workflow by combining Infrastructure as Code (IaC) with an automated CI/CD pipeline. Using Terraform, the infrastructure layer provisions an Amazon S3 bucket configured for static website hosting and integrates it with CloudFront for secure, global content delivery. The application layer is a simple Node.js project that is automatically built and deployed through GitHub Actions, ensuring every code change is tested, packaged, and delivered without manual intervention. This setup highlights best practices such as reproducible infrastructure, automated deployments, and separation of concerns between app and infra. As a portfolio project, it effectively showcases the ability to design and implement a modern cloud-native deployment pipeline end to end.

## Architecture Diagram

                ```
                        AWS Infrastructure Deployment Architecture

                      ┌───────────────────────────────┐
                      │        Developer (You)        │
                      └───────┬───────────┬───────────┘
                              │           │           │
                              │           │           │
                         (/infra)     (/app)    (/aws-backend-infra)
                              │           │                      │
                              ▼           ▼                      ▼
                    ┌────────────────┐   ┌────────────────┐   ┌────────────────────┐
                    │ GitHub Repo:   │   │ GitHub Repo:   │   │ GitHub Repo:       │
                    │ Terraform Code │   │ Node.js App    │   │ Backend Terraform  │
                    └───────┬────────┘   └────────┬───────┘   └───────────┬────────┘
                            │                     │                       │
                            ▼                     ▼                       ▼
                ┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
                │ GitHub Actions:       │   │ GitHub Actions:       │   │ GitHub Actions:       │
                │ Terraform Apply       │   │ Build Node.js App     │   │ Terraform Apply       │
                └──────────┬────────────┘   └──────────┬────────────┘   └──────────┬────────────┘
                           │                           │                           │
                           ▼                           ▼                           ▼
               ┌────────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
               │ AWS S3 Bucket (Hosting)│   │ Deploy /public to S3   │   │ AWS S3 + DynamoDB      │
               └───────────┬────────────┘   └───────────┬────────────┘   │ (Remote Backend)       │
                           │                            │                └────────────────────────┘
                           └──────────┬─────────────────┘
                                      ▼
                          ┌──────────────────────────┐
                          │ Static Website Hosting   │
                          └───────────┬──────────────┘
                                      │
                                      ▼
                     ┌────────────────────────────────┐
                     │   CloudFront                   │
                     │   - HTTPS by default           │
                     │   - Global edge cache          │
                     └────────────────────────────────┘


## 📂 Repository Structure


.
├── app                     # Node.js application source code
│   ├── config.js           # App configuration
│   ├── content             # Static content
│   ├── node_modules        # Installed dependencies
│   ├── package.json        # Node.js project metadata and scripts
│   ├── package-lock.json   # Dependency lock file
│   ├── public              # Build output directory (deployment to S3)
│   └── src                 # Application source code
│
├── aws-backend-infra       # Terraform for remote backend (S3 + DynamoDB)
│   ├── main.tf
│   └── terraform.tfstate
│
├── infra                   # Terraform for infrastructure provisioning
│   ├── main.tf             # Main infra resources (e.g., S3, CloudFront)
│   ├── terraform.tfstate
│   ├── terraform.tfstate.backup
│   ├── terraform.tfvars    # Variable values
│   └── variables.tf        # Input variable definitions
│
└── README.md               # Project documentation


## Workflow

<img width="3840" height="3074" alt="Untitled diagram _ Mermaid Chart-2025-08-19-080321" src="https://github.com/user-attachments/assets/7fd8e3b4-12ac-4713-86be-ac1f8b16f8cc" />

## License

MIT License

Copyright (c) 2025 Kaung Sett Naing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

