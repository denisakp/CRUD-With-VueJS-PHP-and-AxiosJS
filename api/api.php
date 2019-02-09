<?php
$con = new mysqli("localhost", "error504", "admin1234", "ajax_crud");
if($con->connect_error){
    die("Impossible de se connecter à la base de données");
}
$res = array('erreur' =>false);

$action = 'read';
if(isset($_GET['action'])){
    $action = $_GET['action'];
}

if($action == 'read'){
    $resultat = $con->query("SELECT * FROM etudiant");
    $etudiants= array();
    while($row = $resultat->fetch_assoc()){
        array_push($etudiants, $row);
    }
    $res['etudiants'] = $etudiants;
}

if($action == 'create'){
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];

    $resultat = $con->query("INSERT INTO `etudiant` (`nom_etudiant`,`prenom_etudiant`) VALUES ('$nom', '$prenom') ");
    if($resultat){
        $res['message'] = 'Etudiant ajouté avec succès';
    }else{
        $res['error']=true;
        $res['message'] = 'Erreur lors de l\'ajout de l\'etudiant';
        echo "info de l\'erreur". $res."<br>". $con->error;
    }
}

if($action == 'update'){
    $id = $_POST['id_etudiant'];
    $nom = $_POST['nom_etudiant'];
    $prenom = $_POST['prenom_etudiant'];

    $resultat = $con->query("UPDATE etudiant  SET nom_etudiant = '$nom', prenom_etudiant='$prenom' WHERE id_etudiant = '$id' ");
    if($resultat){
        $res['message'] = 'Etudiant modifié avec succès';
    }else{
        $res['error']=true;
        $res['message'] = 'Erreur lors de la modification de l\'etudiant';
        echo "info de l\'erreur". $res."<br>". $con->error;
    }
}

if($action == 'delete'){
    $id = $_POST['id_etudiant'];

    $resultat = $con->query(" DELETE FROM etudiant WHERE id_etudiant = '$id' ");
    if($resultat){
        $res['message'] = 'Etudiant supprimé avec succès';
    }else{
        $res['error']=true;
        $res['message'] = 'Erreur lors de la suppression de l\'etudiant';
        echo "info de l\'erreur". $res."<br>". $con->error;
    }
}

$con->close();
header("Contant-type: application/json");
echo json_encode($res);
die();