
    FROM golang:1.25-alpine3.22 AS builder

    # Installer dépendances nécessaires à la compilation
    RUN apk add --no-cache git gcc musl-dev clang lld
    
    # Variables Hugo
    ARG HUGO_VERSION=0.116.0
    ARG HUGO_BUILD_TAGS="extended"
    ENV CGO_ENABLED=1
    ENV GOPROXY=https://proxy.golang.org
    ENV GOCACHE=/root/.cache/go-build
    ENV GOMODCACHE=/go/pkg/mod
    
    # Créer le répertoire de travail
    WORKDIR /go/src/github.com/gohugoio/hugo
    
    # Copier le code source
    COPY . .
    
    # Build Hugo
    RUN go build -tags "$HUGO_BUILD_TAGS" -ldflags "-s -w -X github.com/gohugoio/hugo/common/hugo.vendorInfo=docker" -o /usr/bin/hugo
    
  
    # Staeg 2 : Dart-Sass
   
    FROM alpine:3.22 AS dart-sass
    ARG DART_SASS_VERSION=1.79.3
    ARG TARGETARCH
    ARG DART_ARCH=${TARGETARCH/amd64/x64}
    WORKDIR /out
    ADD https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-${DART_ARCH}.tar.gz .
    RUN tar -xf dart-sass-${DART_SASS_VERSION}-linux-${DART_ARCH}.tar.gz
    

    # Stage 3: Runtime
  
    FROM alpine:3.22 AS final
    
    # Installer runtime dependencies
    RUN apk add --no-cache \
        libc6-compat \
        git \
        runuser \
        nodejs \
        npm \
        wget
    
    # Copier Hugo depuis le builder
    COPY --from=builder /usr/bin/hugo /usr/bin/hugo
    
    # Copier Dart-Sass
    COPY --from=dart-sass /out/dart-sass /usr/local/bin/dart-sass
    
    # Créer user non-root
    RUN addgroup -S hugo && adduser -S -G hugo hugo \
        && mkdir -p /project /cache \
        && chown -R hugo:hugo /project /cache
    
    USER hugo
    
    WORKDIR /project
    VOLUME /project
    ENV HUGO_CACHEDIR=/cache
    ENV PATH="/usr/local/bin:$PATH"
    
    # Healthcheck basique (Hugo server doit être lancé)
    HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
      CMD wget -q --spider http://localhost:1313/ || exit 1
    
    # Entrypoint (tu peux remplacer par un script custom si besoin)
    ENTRYPOINT ["hugo"]
    CMD ["--help"]
    