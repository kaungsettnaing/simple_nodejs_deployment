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
                     │   CloudFront (Future Updates)  │
                     │   - HTTPS by default           │
                     │   - Global edge cache          │
                     └────────────────────────────────┘


## Repository Structure

├── app
│   ├── config.js
│   ├── content
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   └── src
├── aws-backend-infra
│   ├── main.tf
│   └── terraform.tfstate
├── infra
│   ├── aws-backend
│   ├── main.tf
│   ├── terraform.tfstate
│   ├── terraform.tfstate.backup
│   ├── terraform.tfvars
│   └── variables.tf
└── README.md

## Workflow

flowchart TD

    subgraph DEV["Developer Actions"]
        A["Developer Push Code"]
    end

    %% ---------------------------
    %% Backend Infra (Remote State)
    %% ---------------------------
    subgraph BACKEND["Backend Infra (/aws-backend-infra)"]
        n2["GitHub Repo: Backend Terraform"]
        n3["GitHub Actions: Terraform Apply"]
        n4["AWS S3 Bucket + DynamoDB (Remote State)"]
    end

    %% ---------------------------
    %% Frontend Infra
    %% ---------------------------
    subgraph FRONTEND["Frontend Infra (/infra)"]
        B["GitHub Repo: Terraform"]
        C["GitHub Actions: Terraform Apply"]
        D["AWS S3 Bucket Created"]
    end

    %% ---------------------------
    %% Application Build & Deploy
    %% ---------------------------
    subgraph APP["Node.js App (/app)"]
        n1["GitHub Repo: Node.js"]
        E["GitHub Actions: Build Node.js"]
        F["Deploy /public to S3"]
    end

    %% ---------------------------
    %% Website Delivery
    %% ---------------------------
    subgraph DELIVERY["Website Hosting & Distribution"]
        G["Static Website Hosting (S3)"]
        H["CloudFront: Future Updates"]
    end

    %% Connections
    A -- "/infra" --> B
    B --> C --> D

    A -- "/app" --> n1
    n1 --> E --> F
    D --> G
    F --> G
    G --> H

    A -- "/aws-backend-infra" --> n2
    n2 --> n3 --> n4

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

