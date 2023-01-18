const caseElements = document.querySelectorAll('.form-part__body-part');
const btnsFormPart = document.querySelectorAll('.form-part__btn .btn');
var submitBtns = document.querySelectorAll('.btn-choice');
var formPartInputs = document.querySelectorAll('.form-part input');
var lastIndexFormPart = 0;
var allFormPart = document.querySelectorAll('.form-part');
var defilBtnUp = document.querySelectorAll('.defil-button.form-part__btn .btn')[0];
var defilBtnDown = document.querySelectorAll('.defil-button.form-part__btn .btn')[1];
var informations = {};

allFormPart[0].style.display = 'inline-block';

// action à exécuer pour clique sur boutton defil haut
defilBtnUp.addEventListener("click",function(event){
    event.preventDefault();
    if(lastIndexFormPart > 1){
        lastIndexFormPart--;
        allFormPart.forEach(formPart=>{formPart.style.display = 'none'});
        allFormPart[lastIndexFormPart].style.display = 'inline-block';

    }
});

// action executer pour clique sur boutton defil bas
defilBtnDown.addEventListener("click",function(event){
    event.preventDefault();
    if(lastIndexFormPart < document.querySelectorAll(".form-part").length - 1 
                                && Object.values(informations).length < 10
                                && allFormPart[lastIndexFormPart].classList.contains('form-part__use')){
        lastIndexFormPart++;
        allFormPart.forEach(formPart=>{formPart.style.display = 'none'});
        allFormPart[lastIndexFormPart].style.display = 'inline-block';
    }else{
        allFormPart[lastIndexFormPart].querySelector('.form-response__error').style.display = 'inline-block';
        setTimeout(function(){
            allFormPart[lastIndexFormPart].querySelector('.form-response__error').style.display = 'none'
        } ,2000)
    }
});


// on empeche les boutto de faire leur action par defaut
submitBtns.forEach(submitBtn=>{
    submitBtn.addEventListener('click',function(e)
    {
        e.preventDefault();
        if(submitBtn.classList.contains('premier-button'))
        { 
            allFormPart[0].style.display = 'none';
            lastIndexFormPart++;
            allFormPart[lastIndexFormPart].style.display = 'inline-block';
        }
        else if(this.parentElement.classList.contains('form-part') )
        {
                
                if(submitBtn.parentElement.querySelector('input').length > 3){
                    allFormPart.forEach(formPart=>{formPart.style.display = 'none'});
                    lastIndexFormPart++
                    allFormPart[lastIndexFormPart].style.display = 'inline-block';
                    submitBtn.aprentElement.classList.add('form-part__use')
                }else{
                    submitBtn.querySelector('.form-response__error').style.display = 'inline-block';
                    setTimeout(function(){
                        submitBtn.querySelector('.form-response__error').style.display = 'none'
                    } ,2000)
                }
       }
        else if(submitBtn.parentElement.parentElement.classList.contains('form-part'))
        {
           if(submitBtn.parentElement.parentElement.querySelector('input').value.length > 3)
            {
                allFormPart.forEach(formPart=>{formPart.style.display = 'none'});
                lastIndexFormPart++;
                allFormPart[lastIndexFormPart].style.display = 'inline-block';
                submitBtn.parentElement.parentElement.classList.add('form-part__use')
            }else{
                submitBtn.parentElement.parentElement.querySelector('.form-response__error').style.display = 'inline-block';
                setTimeout(function(){
                    submitBtn.parentElement.parentElement.querySelector('.form-response__error').style.display = 'none'
                } ,2000)
            }
        }
        else if(submitBtn.parentElement.parentElement.parentElement.classList.contains('form-part'))
        {
           
            if(submitBtn.parentElement.parentElement.parentElement.querySelector('.focus-case') == null){
                submitBtn.parentElement.parentElement.parentElement.querySelector('.form-response__error').style.display = 'inline-block';
                setTimeout(function(){
                    submitBtn.parentElement.parentElement.parentElement.querySelector('.form-response__error').style.display = 'none'
                } ,2000)
            }else{
                allFormPart.forEach(formPart=>{formPart.style.display = "none"});
                lastIndexFormPart++;
                allFormPart[lastIndexFormPart].style.display = "inline-block";
                submitBtn.parentElement.parentElement.parentElement.classList.add('form-part__use')
            }
        }
    });
});

// on ajoute les donnees des inputs à l'objet INFORMATIONS
formPartInputs.forEach(formPartInput=>{
    formPartInput.addEventListener('change',function(event){

        if(this.classList.contains('annee-construction') && this.value.length > 3){
            informations.anneeConstruction = this.value;
        }
        if(this.classList.contains('code-postal') && this.value.length > 3){
            informations.codePostal = this.value;
        }
        if(this.classList.contains('prenom-nom') && this.value.length > 3){
            informations.prenomNom = this.value;
        }
        if(this.classList.contains('email') && this.value.length > 3){
            informations.email = this.value;
        }
        if(this.classList.contains('telephone') && this.value.length > 3){
            informations.telephone = this.value;
        }
        if(this.classList.contains('revenu') && this.value.length > 3){
            informations.revenu = this.value;
        }
    })
})

// On ajoute chaque choix du formulaire à l'objet INFORMATIONS
caseElements.forEach(caseElement=>{
    caseElement.addEventListener('click',function(){
        if(caseElement.querySelector('.choice').classList.contains('je-suis')){
            informations.jesuis = caseElement.querySelector('.choice').classList[2];
        }
        if(this.querySelector('.choice').classList.contains('travaux')){
            informations.travaux = this.querySelector('.choice').classList[2];
        }
        if(this.querySelector('.choice').classList.contains('nbre-personne')){
            informations.nbrePersonne = this.querySelector('.choice').classList[2];
        }
        if(this.querySelector('.choice').classList.contains('mode-chauffage')){
            informations.modeChauffage = this.querySelector('.choice').classList[2];
        }
        for(var i = 0; i < caseElements.length; i++){
            caseElements[i].classList.remove('focus-case');
        }
        for(var information in informations){
            if(information != "codePostal" && information != "prenomNom" 
            && information != "anneeConstruction" && information != "email" && information != "revenu"
            && information != "telephone" ){
                document.querySelector("." + informations[information]).parentElement.parentElement.classList.add('focus-case');
            }
        }
    });
});