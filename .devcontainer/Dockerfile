# https://mcr.microsoft.com/en-us/product/devcontainers/base/about
FROM mcr.microsoft.com/devcontainers/base:dev-ubuntu-24.04

RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt \
    apt-get update && \
    apt-get install -y \
      sudo \
      locales \
      net-tools \
      iputils-ping \
      dnsutils \
      bash-completion \
      less \
      curl \
      wget \
      tar \
      xz-utils \
      unzip \
      make \
      gcc \
      git \
      vim \
      tmux \
      jq \
      fzf \
      groff \
      procps \
      default-mysql-client \
      postgresql-client-16 \
      redis-tools

# ロケール設定
RUN echo 'ja_JP.UTF-8 UTF-8' >> /etc/locale.gen && \
    locale-gen && \
    update-locale LANG=ja_JP.UTF-8
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# aws cli インストール
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

# rabbitmqadmin インストール
RUN wget -O /usr/local/bin/rabbitmqadmin https://github.com/rabbitmq/rabbitmqadmin-ng/releases/download/v2.9.0/rabbitmqadmin-2.9.0-x86_64-unknown-linux-gnu && \
    chmod +x /usr/local/bin/rabbitmqadmin

# nodejs インストール
# https://nodesource.com/products/distributions
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# pnpm インストール
RUN npm install -g pnpm