 
    import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

public class Jeux extends JFrame {
    private JTextField inputField; // Zone de saisie de l'utilisateur
    private JTextArea outputArea; // Zone de texte pour afficher les messages
    private JButton submitButton; // Bouton "Valider"
    private JButton resetButton; // Bouton "Réinitialiser"
    private JButton quitButton; // Bouton "Quitter"

    private int randomNumber; // Nombre aléatoire à deviner
    private int attempts; // Nombre de tentatives restantes

    public Jeux() {
        setTitle("Jeu de devinette"); // Titre de la fenêtre
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Fermer l'application lorsque la fenêtre est fermée
        setSize(400, 300); // Taille de la fenêtre
        setLocationRelativeTo(null); // Centrer la fenêtre sur l'écran
        setLayout(new GridLayout(4, 1)); // Utiliser une disposition en grille avec 4 lignes et 1 colonne

        inputField = new JTextField(); // Initialiser la zone de saisie
        inputField.setEditable(false); // Désactiver la saisie utilisateur

        outputArea = new JTextArea(); // Initialiser la zone de texte
        outputArea.setEditable(false); // Désactiver la modification du texte
        JScrollPane scrollPane = new JScrollPane(outputArea); // Ajouter une barre de défilement à la zone de texte

        submitButton = new JButton("Valider"); // Initialiser le bouton "Valider"
        submitButton.setEnabled(false); // Désactiver le bouton

        resetButton = new JButton("Réinitialiser"); // Initialiser le bouton "Réinitialiser"
        resetButton.setEnabled(false); // Désactiver le bouton

        quitButton = new JButton("Quitter"); // Initialiser le bouton "Quitter"

        add(inputField); // Ajouter la zone de saisie à la fenêtre
        add(scrollPane); // Ajouter la zone de texte avec barre de défilement à la fenêtre
        add(submitButton); // Ajouter le bouton "Valider" à la fenêtre
        add(resetButton); // Ajouter le bouton "Réinitialiser" à la fenêtre
        add(quitButton); // Ajouter le bouton "Quitter" à la fenêtre

        generateRandomNumber(); // Générer un nombre aléatoire pour commencer le jeu

        // Ajouter un écouteur d'événements au bouton "Valider"
        submitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int guess = Integer.parseInt(inputField.getText()); // Obtenir le nombre saisi par l'utilisateur
                checkGuess(guess); // Vérifier le nombre saisi
            }
        });

        // Ajouter un écouteur d'événements au bouton "Réinitialiser"
        resetButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                resetGame(); // Réinitialiser le jeu
            }
        });

        // Ajouter un écouteur d'événements au bouton "Quitter"
        quitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                //System.exit(0); // Quitter l'application
            }
        });
    }

    private void generateRandomNumber() {
        Random random = new Random(); // Créer un objet Random pour générer des nombres aléatoires
        randomNumber = random.nextInt(101); // Générer un nombre aléatoire entre 0 et 100
        attempts = 3; // Initialiser le nombre de tentatives restantes à 3
        outputArea.setText("Devinez le nombre (0-100).\nIl vous reste " + attempts + " tentatives."); // Afficher un message d'instruction
        inputField.setEditable(true); // Activer la saisie utilisateur
        submitButton.setEnabled(true); // Activer le bouton "Valider"
        resetButton.setEnabled(false); // Désactiver le bouton "Réinitialiser"
    }

    private void checkGuess(int guess) {
        attempts--; // Décrémenter le nombre de tentatives restantes

        if (guess < randomNumber) {
            if (attempts > 0) {
                outputArea.append("\nVous avez perdu la manche !\nIl vous reste " + attempts + " tentative(s)."
                        + "\nVeuillez saisir un nombre plus grand."); // Afficher un message si le nombre est trop petit
            } else {
                outputArea.append("\nVous avez perdu la partie ! Le nombre était : " + randomNumber
                        + "\nVeuillez cliquer sur Réinitialiser pour jouer à nouveau ou Quitter pour arrêter le jeu."); // Afficher un message si toutes les tentatives sont épuisées
                inputField.setEditable(false); // Désactiver la saisie utilisateur
                submitButton.setEnabled(false); // Désactiver le bouton "Valider"
                resetButton.setEnabled(true); // Activer le bouton "Réinitialiser"
            }
        } else if (guess > randomNumber) {
            if (attempts > 0) {
                outputArea.append("\nVous avez perdu la manche !\nIl vous reste " + attempts + " tentative(s)."
                        + "\nVeuillez saisir un nombre plus petit."); // Afficher un message si le nombre est trop grand
            } else {
                outputArea.append("\nVous avez perdu la partie ! Le nombre était : " + randomNumber
                        + "\nVeuillez cliquer sur Réinitialiser pour jouer à nouveau ou Quitter pour arrêter le jeu."); // Afficher un message si toutes les tentatives sont épuisées
                inputField.setEditable(false); // Désactiver la saisie utilisateur
                submitButton.setEnabled(false); // Désactiver le bouton "Valider"
                resetButton.setEnabled(true); // Activer le bouton "Réinitialiser"
            }
        } else {
            outputArea.append("\nBravo ! Vous avez réussi.\nVeuillez cliquer sur Réinitialiser pour jouer à nouveau."); // Afficher un message si le nombre est deviné
            inputField.setEditable(false); // Désactiver la saisie utilisateur
            submitButton.setEnabled(false); // Désactiver le bouton "Valider"
            resetButton.setEnabled(true); // Activer le bouton "Réinitialiser"
        }

        inputField.setText(""); // Effacer le contenu de la zone de saisie
        inputField.requestFocus(); // Mettre le focus sur la zone de saisie pour une nouvelle tentative
    }

    private void resetGame() {
        generateRandomNumber(); // Réinitialiser le jeu en générant un nouveau nombre aléatoire
        outputArea.setText(""); // Effacer le contenu de la zone de texte
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                Jeux jeu = new Jeux(); // Créer une instance du jeu
                jeu.setVisible(true); // Rendre la fenêtre visible
            }
        });
    }
}




Math.round(12.3)