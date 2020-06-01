import React from 'react';
import '../../sass/main.scss';

const About = () => {
    return <about>
              <div className="About">
                   <div className="About-text">
                       <p>Vestige tim je sačinjen od grupe mladih i sposobnih ljudi koji vjeruju da samo kvalitet osvaja mase. 
                           To nam je motiv i samo to zagovaramo - kvalitet. Imamo pun arsenal modernih taktika za marketig, ali
                            čvrsto vjerujemo da je najbolja reklama kvalitetan prozivod. </p>
                       <p>Vestige nudi najbolje prozivode mirisnih testera. Strogo vodimo računa odakle nabavljamo
                           proizvode i šta prodajemo jer ne prihvatamo nezadovoljstvo naših klijenata.
                         Naši proizvodi su isključivo originalni testeri od pravih prozvođača, zapakovani u originalne boce. </p>
                        <p>Šta su testeri? Testeri dolaze u bočicama sa najvećom militražom u kojoj se isti parfem prodaje.
                             Sama bočica je identična originalnom pakovanju. Testeri se ne razlikuju u trajnosti i intezivnosti od istog parfema u ambalaži namjenjenoj za prodaju u parfimerijama. Prednost testera je cijena koja je niža od komercijalnog pakovanja parfema.</p>
                   </div>
                   <div className="About-img">
                       <div className="About-img-logo">
                            <img  src={require(`../../assets/images/logo.png`)}/>
                       </div>
                      <img  src={require(`../../assets/images/about.jpg`)}/>
                   </div>
              </div>
          </about >
}

export default About