{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20 # Also try pkgs.nodejs_18
    pkgs.docker
  ];
  # Sets environment variables in the workspace
  env = {};
  # Fast way to run sidecar containers in your workspace
  services = {
    docker = {
      enable = true;
    };
  };
  # Docker, Cuttlefish, and other extensions can connect to services
  # on ports exposed from your workspace.
  #
  # Example:
  # ports = {
  #   # image = "httpd";
  #   # port = 8080;
  #   # command = "httpd -D FOREGROUND";
  # };
}
