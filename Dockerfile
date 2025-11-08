FROM node:current-alpine as base
WORKDIR /jonoob
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY . .

RUN npm install -g pnpm@latest-10

FROM base as deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile


FROM base as dev

COPY --from=deps /jonoob/node_modules /jonoob/node_modules

CMD ["pnpm", "dev"]