# PsicoTest

![React 19](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![CI](https://github.com/yehudalevy-collab/psicotest-yehuda/actions/workflows/ci.yml/badge.svg)](https://github.com/yehudalevy-collab/psicotest-yehuda/actions/workflows/ci.yml)

Quiz psicológico interactivo sobre relaciones — dos instrumentos clásicos de la psicología del apego y del amor, con resultados explicados y recomendaciones personalizadas. *Interfaz en español.*

## Los dos tests

**1. Estilo de apego** — 10 ítems sobre las dos dimensiones del modelo ECR (ansiedad y evitación). El resultado ubica tu perfil entre apego seguro, ansioso, evitativo o mixto, con una explicación de qué significa y cómo trabajarlo.

**2. Triángulo del amor** — basado en la teoría triangular de Sternberg: intimidad, pasión y compromiso. Mide el balance de los tres componentes en tu relación actual.

Cada resultado incluye explicación del tipo primario, desglose por dimensión (gráficos con Recharts) y recomendaciones concretas. El historial de resultados se guarda localmente en tu navegador (`localStorage`) — nada sale de tu dispositivo.

## Ejecutar localmente

Requiere Node.js 18+.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Todo corre en el cliente: sin backend, sin claves de API, sin tracking.

```bash
npm run build    # build de producción → dist/
npm run lint     # typecheck (tsc --noEmit)
```

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion (animaciones) · Recharts (gráficos) · lucide-react (iconos)

## Nota

Este proyecto es educativo y de autoconocimiento. No sustituye una evaluación psicológica profesional.

## Licencia

[MIT](LICENSE)
