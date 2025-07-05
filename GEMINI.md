# Gemini Project: vibecode-blog-static

This document outlines the development process and architecture of the `vibecode-blog-static` project, a fully automated, serverless blog built on GitHub Pages.

## Project Goal

The initial goal was to create a simple, elegant blog that could be updated from a web browser, specifically from an iPad. This constraint meant that traditional server-based admin panels were not a viable solution.

## Development Journey & Key Decisions

The project went through several iterations to arrive at the final, robust solution.

### 1. The Initial (Incorrect) Approach: Node.js Admin Panel

The first version involved a Node.js and Express-based server that provided a web interface for creating and editing posts.

*   **Problem:** This approach required a server to be running, which is not possible on an iPad or within the static-only environment of GitHub Pages. This was a key oversight that required a complete pivot.

### 2. The Pivot: A Serverless GitHub Actions Workflow

The correct solution was to embrace a serverless architecture where all the "backend" work is handled for free by GitHub Actions.

*   **Markdown as the Source:** The user creates and edits blog posts as simple Markdown (`.md`) files in a dedicated `posts_md` directory. This can be done easily from any web browser, including on an iPad.
*   **Automated Conversion:** A GitHub Action is configured to trigger every time a change is pushed to the `posts_md` directory.
*   **The Build Process:** The Action runs a Node.js script (`generate-index.js`) that performs two key tasks:
    1.  It converts each Markdown file into a complete, styled HTML page.
    2.  It automatically generates the blog's homepage (`index.html`) by creating a list of all available posts.

### 3. Layout and Feature Enhancements

With the core workflow in place, we focused on improving the user experience and visual consistency.

*   **Visual Unification:** The blog's stylesheet (`style.css`), logo, and footer were synchronized with the main `comingsoonsite` to create a cohesive brand identity. This included implementing a "sticky footer" using Flexbox and adding the animated starry background.
*   **Dynamic Homepage Layout:** The homepage was redesigned to feature the full text of the most recent blog post in a main content area, with a sidebar on the left that lists all older posts for easy navigation.
*   **User-Friendly Features:** A "Back to Home" link was added to post pages, and the header logo was made clickable, linking back to the main `vibecodes.space` landing page.

### 4. Troubleshooting and Refinements

The development process involved solving several common issues:

*   **Action Permissions:** The GitHub Action initially failed because it lacked the necessary permissions to commit the generated HTML files back to the repository. This was fixed by adding a `permissions` block to the workflow file.
*   **Broken Links:** The links to older posts were initially broken due to incorrect relative paths. The build script was updated to generate absolute paths, fixing the 404 errors.
*   **Asset Paths:** The path to the GitHub social media icon in the footer was corrected.

## Final Architecture

The final result is a sophisticated, zero-maintenance, and free-to-host blog.

*   **Content Management:** Done by creating `.md` files in the `posts_md` folder on GitHub.
*   **Build & Deployment:** Handled entirely by a GitHub Action.
*   **Hosting:** Provided by GitHub Pages.

## Next Steps

Tomorrow, we will explore options for adding a secure login system for administrative purposes, likely leveraging a client-side solution or a serverless function to keep the project aligned with its current architecture.
