# CheeseCraft
#### Video Demo: *TODO*
#### Description:

CheeseCraft is a Minecraft server aimed toward resource gathering and building. This website, written using HTML, CSS, and JavaScript with [Eleventy](https://www.11ty.dev/) and [Cloudflare Pages](https://pages.cloudflare.com/), introduces new players to my server and provides a review of previous game seasons. The project also consists of a Linux server hosted on a repurposed laptop and written in [Nix](https://nixos.org/) that hosts the Minecraft worlds securely.

The following is a summary of the project and a description of its design process.

## Motivation

*TODO*

## Goals

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

The site was designed to give an introduction to my Minecraft server for new players who may be interested. The main page describes the server's rules, expectations, and goals and contains a registration form and some contact information. There is also a gallery page that will contain screenshots from current and past game seasons as well as short descriptions of each season's events and history.

`.eleventy.js`: This is a configuration file that sets up Eleventy and its page generation components. A custom Markdown parser is set up and some plugins are added to enable the generation of HTML header anchors. The `eleventy-img` plugin is loaded and configured to output images into a predefined directory. Some static files are passed through to the generated website, and a custom `grid` shortcode is created to enable grid formatting later.

`flake.nix`: This file sets the project up as a Nix flake. A development shell with `node.js` pre-installed can be launched by running `nix develop` in the project directory.

`main.css`: Describes the formatting and theme for the entire site. This is by far the largest file in the entire project. Custom fonts are loaded for the header and body text. Custom fonts are optimized such that a system font may be used while they are loading. The header is set to take up the entire viewport size on the homepage, and to appear as a top banner on all other pages. The header's background image has a 3D parallax effect written in pure CSS. The effect is created by having the header be positioned behind the rest of the document in 3D space. The header text and tagline are centered with CSS flexbox, and the links are styled as buttons. The header text and buttons are automatically scaled to look good on all devices and screen sizes. Some shadows, hover animations, and various visual elements are added to enhance the visual appeal of the site. The footer is positioned at the bottom of the page. Some margins are added to separate paragraphs from each other and the top and bottom of the page. Padding is used to ensure that text is spaced away from the side of the screen on mobile devices.

`manifest.json`: This PWA manifest allows the site to be installed to the home screen as if it was a mobile app. It describes the site title, the way it should be displayed, and contains links to its app icons.

`robots.txt.njk`: This Nunjucks file generates the `robots.txt` file for search engines. It points to the sitemap and allows all pages to be indexed.

`sitemap.11ty.js`: This script generates a plain-text sitemap containing all of the site's pages that are not excluded from Eleventy's collections (indicating that a page is internal and does not represent content.)

`_data/layout.js`: This script sets the default template for all pages unless specified manually.

`_data/navItems.json`: The top navigation items are represented here along with their Font Awesome icons for easy modification. These are rendered as buttons on the main page.

`_data/site.json`: Describes the site to Eleventy and to templates. Contains the site title, tagline, copyright string, base URL, and paths to some metadata files.

`_includes/default.njk`: This is the base HTML template for the entire site. It handles linking in fonts and stylesheets, setting the page title and description, and uses semantic HTML tags to define content areas.

`_includes/home.njk`: This is the template for the main page, extending the default template. It sets up the large banner and renders the navigation items as buttons.

`fonts/`: Contains all the custom fonts used on the site.

`icons/`: Contains the site's icons, as well as a maskable icon with a solid background.

`images/`: Contains the original images used on the site. These images are processed by `eleventy-img` and automatically converted to different resolutions and formats for optimization.

### Nixlet

The server was designed to be secure and easy to maintain. I started out by installing NixOS on a repurposed laptop and writing a Nix flake to configure it. The project initially started out with me writing my own virtualisation module that uses `qemu` to run auto-generated virtual NixOS systems. A bridge interface was used to connect the virtual machines to the local network. The virtual systems would each run their own instances of the Minecraft server software and be assigned their own IP addresses by the local router, just like any other device on the network. It was ultimately decided that the scheme with a cluster of auto-generated VMs on a base NixOS system was overly complex, difficult to maintain and too prone to instability.

To improve reliability and ease of maintenance, I designed [an image-based NixOS system known as `nixlet`](https://github.com/peter-marshall5/nixlet) that I installed as a base layer on the server. The "hypervisor" system profile used on the server comes with `libvirt` and `qemu` pre-installed as well as some example VM configurations. The system is very easy to install and has support for RAID-1 arrays to improve reliability. Updates are handled automatically in a similar way to Chrome OS, with two separate system partitions allowing for atomic updates with minimal downtime and easy rollbacks to the previous system version. A single virtual NixOS system that runs the Minecraft server instances was installed on top of the hypervisor. Other isolated systems could be installed alongside it, allowing the sharing of storage space and computing resources while maintaining isolation. System updates are automatically generated according to Git tags by GitHub's CI.

`flake.nix`: Defines Nixlet's basic NixOS configuration modules and system profiles. Update files and flashable disk images can be built via `nix build github:peter-marshall5/nixlet#profile`.

`modules/default.nix`: Imports the default Nixlet configuration and disk image builder. Called from `flake.nix` to generate a Nixlet system.

`modules/base-config.nix`: The base Nixlet configuration. This sets some NixOS system defaults suitable for minimal systems.

'modules/image/erofs.nix': Outputs a compressed EROFS filesystem based on the given Nix store contents. Based on a pull request that was not merged into `Nixpkgs` yet.

'modules/image/ab-image.nix`: Configures and builds a Nixlet disk image. The filesystems are configured to mount the partition containing the Nix store of the current system version. The flashable disk image is built via `systemd-repart`. `systemd-repart` runs in the booted Nixlet system as well to expand the flashed image on first boot. Finally, `systemd-sysupdate` is configured to periodically fetch and install system updates from the releases section of the GitHub repo.

`modules/image/ab-image-release.nix`: Pulls the update files and disk image together into a format suitable for `systemd-sysupdate` and GitHub releases.

`modules/image/build-ab-image.nix`: Creates a shortcut to build a disk image release from a given NixOS system configuration.

`modules/profiles/debug.nix`: Enables some debugging options for testing if included in the system, not used for releases.

`modules/profiles/server.nix`: Enables some options suitable for servers, like disabling power management and loading Ethernet drivers.

`modules/profiles/hypervisor.nix`: Enables some options suitable for hypervisor systems, and included in the `hypervisor` profile. This extends `server.nix` by enabling support for RAID arrays, installing `libvirt` and `qemu`, adding a bridge interface for VM networking, and including example VM configuration files.

`.github/workflows/build.yml`: Uses Github Actions to automatically build a release whenever an update is pushed to the repository.

# OPCC

This is the configuration for the virtualised NixOS system that runs the Minecraft server instances. In this project, it is running on top of `qemu` and `libvirt` on Nixlet. The Nix Flake contained in this repo is designed to be extensible with reusable Nix modules. Secret management is handled by [`agenix`](https://github.com/ryantm/agenix).

`flake.nix`: Defines dependencies, the system profile and the configuration for (`deploy-rs`)[https://github.com/serokell/deploy-rs].

`ssh/host-keys.nix`: Defines the server's SSH public key. Used by `agenix` to decrypt secrets on the server.

`ssh/trusted-keys.nix`: Defines SSH public keys that are authorized to access the server. Also used by `agenix` for encrypting secrets on development machines.

`secrets/secrets.nix`: Lists secrets to be managed by `agenix` and pulls in the trusted SSH keys.

`hosts/opcc/configuration.nix`: Configuration specific to the `opcc` server. Includes setting up the Minecraft server instances.

`hosts/opcc/hardware-configuration.nix`: Defines the `opcc` server's hardware configuration and filesystems. Pulls in the `qemu-guest` profile since the system is running in a VM.

`modules/default.nix`: Sets some generic default options for Linux servers and pulls in the other modules in this directory.

`modules/services/networking/duckdns.nix`: A Nix module for dynamic DNS via [DuckDNS](https://www.duckdns.org/).

`modules/services/networking/upnp.nix`: Runs a UPnP client to automatically open firewall ports in the router.

`modules/services/minecraft.nix`: A Nix module that runs a Minecraft Bedrock edition server. Based on [this handy Docker image](https://github.com/itzg/docker-minecraft-bedrock-server).
