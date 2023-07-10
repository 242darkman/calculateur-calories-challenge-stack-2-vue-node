<template>
  <div>
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        Timeline de votre decouverte de Quasar
      </q-timeline-entry>

      <q-timeline-entry
        title="1er cours"
        subtitle="Lundi 19 juin 2023"
        color="positive"
        icon="done"
      >
        <div>
          La panique vous gagne, yarn et npm refuse de faire tourner le projet
          et c'est la page blanche. Heureusement, la solution a été trouvée et
          l'apprentissage a pu démarrer.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="2eme cours"
        subtitle="Mercredi 21 juin 2023"
        color="positive"
        icon="done"
      >
        <div>
          Le prof a distribué un super template de démarrage avec des exemples
          de composants, de routes, de layout qui m'ont permis de mieux
          comprendre comment marche un projet Quasar.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="3eme cours"
        subtitle="Jeudi 22 juin 2023"
        icon="cast_for_education"
      >
        <div>
          J'ai pu voir Pinia et Axios, qui m'ont permis de faire des appels aux
          API représentant le back-end, et a stocker les valeurs dans un espace
          mutualisé et accessible pour tous les composants.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="4eme cours"
        subtitle="Vendredi 23 juin 2023"
        icon="quiz"
      >
        <div>
          EXAMEN ! Heureusement, j'ai bossé jours et nuits, je suis READY.
        </div>
      </q-timeline-entry>
    </q-timeline>
    <div class="text-h4">
      Ceci est la seconde page ! Elle importe le meme composant que la page
      home, démontrant tout l'interet des composants, réutilisables a l'infini
    </div>
    <p>
      <q-btn
        class="q-mt-md"
        color="primary"
        text-color="white"
        label="Clique ici pour changer le texte de la props"
        @click="changePropsMessage"
      />
    </p>
    <p><ChildComponentExample :propsMessage="propsMessage" /></p>
  </div>
</template>

<script>
import { ref } from "vue";
import ChildComponentExample from "../components/ChildComponentExample.vue";

export default {
  name: "SecondPage",
  components: {
    ChildComponentExample,
  },
  setup() {
    let propsMessageNumber = 1;
    const propsMessage = ref("1er message depuis la seconde page");
    const changePropsMessage = () => {
      if (propsMessageNumber === 1) {
        propsMessage.value = "2eme message depuis la seconde page";
        propsMessageNumber = 2;
      } else {
        propsMessage.value = "1er message depuis la seconde page";
        propsMessageNumber = 1;
      }
    };
    return {
      changePropsMessage,
      propsMessage,
    };
  },
};
</script>
<style></style>
