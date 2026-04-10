import React from 'react';

const teamMembers = [
  {
    name: 'David James',
    profession: 'Profession',
    image: '/img/team-1.jpg',
    socials: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  },
  {
    name: 'Sarah Lee',
    profession: 'Profession',
    image: '/img/team-2.jpg',
    socials: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  },
  {
    name: 'Michael Chen',
    profession: 'Profession',
    image: '/img/team-3.jpg',
    socials: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  },
  {
    name: 'Emily Smith',
    profession: 'Profession',
    image: '/img/team-4.jpg',
    socials: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  },
];

function Team() {
  return (
    <div className="container-fluid team pb-5">
      <div className="container pb-5">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: '800px' }}
        >
          <h4 className="text-primary">Our Team</h4>
          <h1 className="display-5 mb-4">Meet Our Advisers</h1>
          <p className="mb-0">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis
            itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
            obcaecati, ipsam mollitia hic.
          </p>
        </div>
        <div className="row g-4">
          {teamMembers.map((member, i) => (
            <div key={i} className={`col-md-6 col-lg-6 col-xl-3 wow fadeInUp`} data-wow-delay={`${0.2 + 0.2 * i}s`}>
              <div className="team-item">
                <div className="team-img">
                  <img src={member.image} className="img-fluid" alt="Team" />
                </div>
                <div className="team-title">
                  <h4 className="mb-0">{member.name}</h4>
                  <p className="mb-0">{member.profession}</p>
                </div>
                <div className="team-icon">
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href={member.socials.facebook}><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href={member.socials.twitter}><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href={member.socials.linkedin}><i className="fab fa-linkedin-in"></i></a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-0" href={member.socials.instagram}><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team; 