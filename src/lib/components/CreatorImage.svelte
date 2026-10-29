
<script lang="ts">
  let {
    src,
    alt,
    class: className = ''
  } = $props() as {
    src: string;
    alt: string;
    class?: string;
  };

  let canvasEl: HTMLCanvasElement;

  function removeGreenScreen(img: HTMLImageElement) {
    if (!canvasEl || !img.naturalWidth || !img.naturalHeight) return;

    const ctx = canvasEl.getContext('2d', {
      willReadFrequently: true
    });

    if (!ctx) return;

    // Canvas mengikuti resolusi asli PNG
    canvasEl.width = img.naturalWidth;
    canvasEl.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(
      0,
      0,
      canvasEl.width,
      canvasEl.height
    );

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (g > 90 && g > r * 1.3 && g > b * 1.3) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function handleLoad(e: Event) {
    const img = e.currentTarget as HTMLImageElement;
    removeGreenScreen(img);
  }
</script>

<div class="creator-image {className}">
  <img
    {src}
    {alt}
    class="source-image"
    onload={handleLoad}
    crossorigin="anonymous"
  />

  <canvas
    bind:this={canvasEl}
    class="processed-image"
    aria-label={alt}
    role="img"
  ></canvas>
</div>

<style>
  .creator-image {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .source-image {
    display: none;
  }

  .processed-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
