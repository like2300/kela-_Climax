from django.db import models

class Slide(models.Model):
    img = models.ImageField(upload_to="slides/images/", blank=True, null=True)
    video = models.FileField(upload_to="slides/videos/", blank=True, null=True)

    def __str__(self):
        if self.img:
            return f"Image: {self.img.name}"
        elif self.video:
            return f"Vidéo: {self.video.name}"
        return "Slide sans média"

class FirstPage(models.Model):
    slide = models.ForeignKey(Slide, on_delete=models.CASCADE, related_name='first_pages')
    title = models.TextField(
        max_length=300,
        null=False,
        default="Consultez vos résultats en toute simplicité"
    )
    description = models.TextField(
        max_length=300,
        null=False,
        default="Vérifiez les résultats du BAC, BEPC, CEPE depuis votre mobile. Rapide, sécurisé et officiel pour tous les élèves du Congo."
    )

    def __str__(self):
        return self.title
