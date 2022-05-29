<template>
  <div class="about-wrapper container">
    <div class="about-me__image">
      <img src="@/assets/navigation/about.jpg" alt="" />
    </div>
    <div class="about-me__content">
      <p>
        Fotograf z wieloletnim doświadczeniem. Na co dzień związana z firmą
        kosmetyczną o zasięgu globalnym. Pasjonatka fotografii, estetka,
        wizjonerka. Dzięki dużej elastyczności i zrozumieniu potrzeb klienta, w
        jej portfolio znajdują się kampanie realizowane na potrzeby rynków o
        różnych potrzebach czy odmiennych kulturowo (np. Zjednoczone Emiraty
        Arabskie, Rosja, Stany Zjednoczone, Australia).
      </p>
      <p>
        Pracowała przy kreacji licznych projektów z zakresu fotografii beauty,
        fashion i lifestyle. Doskonale czuje się współpracując z influencerami,
        celebrytami i najlepszymi modelkami z Polski i świata. Za punkt honoru
        uznaje ciągle doskonalenie, odkrywanie i utrwalanie piękna poprzez
        fotografię.
      </p>
      <p>
        Jej prace można oglądać w najlepszych pismach branżowych (np. Vogue,
        Elle, InStyle), na portalach internetowych oraz w międzynarodowych
        kampaniach marketingowych. Doświadczona także w fotografii reportażowej,
        produktowej i fotografii mody. Jako fotograf freelancer pracowała z
        markami z branży fashion, lifestyle oraz FMCG.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.about-wrapper {
  min-height: var(--content);
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-content: center;
}
.about-me__image {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    object-fit: contain;
  }
}
.about-me__content {
  font-family: 'Footura PT', sans-serif;
  line-height: 1.2;
  font-size: 1.2rem;
  text-align: left;
  p {
    margin-bottom: 1rem;
  }
}
</style>
