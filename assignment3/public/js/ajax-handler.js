$(document).ready(function () {
  populate();
  $('#demo-save').click(function () {
    var name = $('#lname').val();
    var age = $('#age').val();
    var gender = $('#gender-select').find(':selected').val();
    var image = $('#photo').attr('src');


    localStorage.setItem('name', name);
    localStorage.setItem('age', age);
    localStorage.setItem('gender', gender);
    localStorage.setItem('image', image);

    $('#form1 input').val('');
    $('#gender-select').val('---');
    $('#form1 textarea').val('');
    return false;
  });

  $('#vitals-save').on('click', addUser);
});

function populate() {
  var content = '';
  var name, age, image, gender, medics, notes;
  var i = 0;
  $.getJSON('/users', (data) => {
    $.each(data, () => {

      name = data[i].name;
      age = data[i].age;
      gender = data[i].gender;
      image = data[i].image;
      medics = data[i].medics;
      notes = data[i].notes;
      content += `<tr><td>${name}</td>
                      <td>${age}</td>
                      <td>${gender}</td>
                      <td class="img-cell"><img src=${image} class="img-table"></td>
                      <td>${medics}</td>
                      <td>${notes}</td>`;

      i = i + 1;
    });
    $('#details-table').html(content);
  });
}

function addUser(event) {
  event.preventDefault();
  var name = localStorage.getItem('name');
  var age = localStorage.getItem('age');
  var gender = localStorage.getItem('gender');
  var image = localStorage.getItem('image');
  var medics = $('#medics').val();
  var notes = $('#notes').val();

  var user = {
    name,
    age,
    gender,
    image,
    medics,
    notes
  }

  // console.log(name);
  // console.log(age);
  // console.log(gender);
  // console.log(image);
  // console.log(medics);
  // console.log(notes);

  $.ajax({
    url: '/users/userlist',
    type: 'POST',
    data: user,
    dataType: 'JSON'
  }).done(function(response) {
    // console.log('Before if');
    if (response.msg === '') {
      $('#form2 textarea').val('');
      $('#form2 input').val('');
      // console.log('To populate');
      populate();
      // console.log('Populated');
    } else {
      alert('Error: ', response.msg);
    }
  });
}
