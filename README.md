# CheeseCraft
#### Video Demo: *TODO*
#### Description:

CheeseCraft is a Minecraft server aimed toward resource gathering and building. This website, written using HTML, CSS, and JavaScript with [Eleventy](https://www.11ty.dev/) and [Cloudflare Pages](https://pages.cloudflare.com/), introduces new players to my server and provides a review of previous game seasons. The project also consists of a Linux server hosted on a repurposed laptop and written in [Nix](https://nixos.org/) that hosts the Minecraft worlds securely.

The following is a summary of the project and a description of its design process.

## Motivation

*TODO*

## Minimum Requirements

These goals were the minimum requirements for the project:

### Minecraft Server

- The Minecraft server should be able to handle at least 5 concurrent players using high render distance settings.
- The server should be able to handle more resource-intensive builds well (like mob farms, complex redstone circuits, etc).
- The server must be secure and easy to maintain.
- The server should be reliable. (It shouldn't lose data or go offline due to software issues.)
- The server should be reasonably protected against security threats from bots and malicious actors. (Port scanning, brute-force attacks, vulnerabilities in the Minecraft software itself)
- Ideally, the cost should be as low as possible. The server should be on-premise and mostly built out of parts that I have on hand.

### Website

- The website should use a templating language to avoid copy-pasting HTML as much as possible. A change should only have to be made in a template to affect all pages.
- The chosen framework must be simple, minimal, and relatively easy to work with and extend.
- The website must be visually appealing. It should look modern and contain visual elements and effects to maintain the user's attention.
- The website should be easy to navigate.
- The website should follow the best practices of HTML, and should get a good score on [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- The website should be reliable and load quickly.

## Topics Researched

The following topics were explored and used during the creation of this project:

- Resistance to data loss: Backups, RAID, snapshots.
- Linux system administration and security, SSH
- Immutable Linux distributions, NixOS
- Functional programming and the Nix toolset
- Isolation of applications on Linux: Kernel-based containers (Docker, systemd-nspawn, etc), KVM.
- Networking (In general but more aimed toward Linux): IPv4, IPv6, NAT, firewalls, network switches, Linux bridge interfaces
- Linux service management, systemd and its components.
- Web development, new CSS features, JavaScript frameworks, static site generators
- SEO, Web accessibility, UI / UX design
- Cloud, Edge, and Serverless Computing
- Image optimization and different image formats

## Design

### Website

I wanted my site to be hosted in a way that is fast, secure, and easy to develop. I did some research into Web hosting and development, and discovered [Jamstack](https://jamstack.org/). Sites built according to the Jamstack principles are immutable and use serverless hosting, meaning that something like Flask or PHP would not work. I discovered that static site generators can be used to transform a set of content in various formats into a ready-to-serve static website compatible with serverless hosting.

I initially considered using [Astro](https://astro.build/) for its great out of the box feature set, although its complexity proved to put using it outside of the scope of this project. The static site generator [Eleventy](https://www.11ty.dev/) was ultimately chosen instead due to its simplicity, which makes it highly customizable and extensible. While Astro is complex and does things its own way, Eleventy is designed to give much more control to the developer and can adapt to specific use cases more easily.

# Server

