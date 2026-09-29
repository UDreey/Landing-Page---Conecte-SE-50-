# Landing Page - Conecte-SE 50+

Landing page estática do projeto Conecte-SE 50+, feita com HTML, CSS e JavaScript.

## Estrutura

- `Page/`: página principal.
- `Estilo/`: estilos da página.
- `Script/`: interações da página.
- `Assets/`: logo e outros arquivos visuais.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica o site automaticamente quando há um push para `main`. Ele também pode ser iniciado manualmente na aba **Actions**, selecionando **Publicar no GitHub Pages** e clicando em **Run workflow**.

Antes da primeira publicação:

1. Abra **Settings > Pages** no repositório do GitHub.
2. Em **Build and deployment**, escolha **GitHub Actions** como origem.
3. Envie o workflow para a branch `main`.

Quando o workflow terminar, abra a execução na aba **Actions** para encontrar a URL publicada no job de deploy.
