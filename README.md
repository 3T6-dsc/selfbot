# 🤖 Discord SelfBot

Un selfbot Discord avancé avec des fonctionnalités d'IA et de snipe, développé en JavaScript.

## ⚠️ Avertissement

L'utilisation de selfbots va à l'encontre des conditions d'utilisation de Discord. Ce projet est à but éducatif uniquement. L'utilisation d'un selfbot peut entraîner la suspension de votre compte Discord.

## ✨ Fonctionnalités

- 🤖 Intégration de l'IA Gemini pour des conversations naturelles
- 🎯 Système de snipe pour récupérer les messages supprimés
- 💬 Réponse automatique IA pour les messages privés
- ⚡ Performance et faible consommation de ressources
- 🛠️ Architecture modulaire et extensible

## 🚀 Installation

1. Clonez le repository
```bash
git clone https://github.com/3T6-dsc/selfbot
cd selfbot
```

2. Installez les dépendances
```bash
npm install
```

3. Configurez le fichier `.env`
```env
TOKEN=votre_token_discord
```

4. Démarrez le bot
```bash
node index.js
```

## 📚 Commandes

| Commande | Description |
|----------|-------------|
| `!snipe` | Affiche le dernier message supprimé |
| `!ia <prompt>` | Génère une réponse avec l'IA |
| `!autorespond` | Active/désactive la réponse automatique |

## 🛠️ Technologies Utilisées

- [Discord.js-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)
- [Google Gemini AI](https://ai.google.dev/)
- [Node.js](https://nodejs.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## 📁 Structure du Projet

```
discord-selfbot/
├── commands/           # Commandes du bot
├── events/            # Gestionnaires d'événements
├── .env              # Configuration des variables d'environnement
├── index.js          # Point d'entrée
└── README.md         # Documentation
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -am 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## ⭐ Support

Si vous aimez ce projet, n'hésitez pas à lui donner une étoile sur GitHub !

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---
Développé avec ❤️ par 3T6-dsc