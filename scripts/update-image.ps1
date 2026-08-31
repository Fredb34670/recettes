param([string]$Recipe, [string]$File)
if (-not $Recipe -or -not $File) {
  Write-Host "Usage: .\update-image.ps1 -Recipe creme-brulee -File C:\Users\Fred\Desktop\nouvelle.jpg"
  exit
}
$dest = "I:\Workspace\active-projects\Appli_web\Recettes\app\public\images\recipes\$Recipe.jpg"
Copy-Item $File $dest -Force
Write-Host "Image mise a jour: $dest (recette: $Recipe)"
Write-Host "Pensez a faire: git add app/public/images/recipes/$Recipe.jpg && git commit -m 'update: image $Recipe' && git push"
