var app = new Vue({
    el: "#root",
    data: {
        showingAddModal: false,
        showingEditModal: false,
        showingDeleteModal: false,
        errorMessage: "",
        succesMessage: "",
        etudiants: [],
        newEtudiant: {nom: "", prenom: ""},
        clickedEtudiant:{}
    },
    mounted:function(){
        console.log("mounted");
        this.getAllEtudiants();
    },
    methods: {
        //Getting all students function
        getAllEtudiants: function(){
            axios.get("http://localhost:3000/api.php?action=read")
            .then(function(response){
                console.log(response);
                if(response.data.error){
                    app.errorMessage = response.data.message;
                }else{
                    app.etudiants = response.data.etudiants;
                }
            });
        },
        //Saving student function
        saveEtudiant: function(){
            console.log(app.newEtudiant);
           var formData = app.toFormData(app.newEtudiant);
           axios.post("http://localhost:3000/api.php?action=create", formData)
           .then(function(response){
               console.log(response);
               app.newEtudiant = {nom: "",prenom: ""};
               if(response.data.error){
                   app.errorMessage = response.data.message;
               }else{
                   app.getAllEtudiants();
               }
           });
        },
        //Editing student function
        updateEtudiant: function(){
            var formData = app.toFormData(app.clickedEtudiant);
            axios.post("http://localhost:3000/api.php?action=update", formData)
            .then(function(response){
                app.clickedEtudiant = {};
                if(response.data.error){
                    app.errorMessage = response.data.message;
                }else{
                    app.succesMessage = response.data.message;
                    app.getAllEtudiants();
                }
            });
        },
        //Deleting student function
        deleteEtudiant: function(){
            var formData = app.toFormData(app.clickedEtudiant);
            axios.post("http://localhost:3000/api.php?action=delete",formData)
            .then(function(response){
                app.clickedEtudiant = {};
                if(response.data.error){
                    app.errorMessage = response.data.message;
                }else{
                    app.succesMessage = response.data.message;
                    app.getAllEtudiants();
                }
            });
        },
        //Selected student
        selectEtudiant(etudiant){
            app.clickedEtudiant = etudiant;
        },
        
        toFormData:function(obj){
            var form_data = new FormData();
            for(var key in obj){
                form_data.append(key,obj[key]);
            }
            return form_data;
        },

        clearMessage: function(){
            app.errorMessage = "";
            app.succesMessage = "";
        }
    }
});