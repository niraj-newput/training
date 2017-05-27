var count = 0;
var  countryData = [{
        'color' : '#AACC33',
        'title' : 'argentina',
        'img'   : 'image/argentina.png',
        'desc'  : 'Argentinas flag is a light blue and white triband with a yellow Sun of May in the center. The flag is twice as wide as it is tall.'
    },
    {
        'color' : '#66BB33',
        'title' : 'Australia',
        'img'   : 'image/australia.png',
        'desc'  : 'A Red Ensign with the Commonwealth/Federation Star at the hoist, and the Southern Cross in the fly half. The flag of Australia is a defaced Blue Ensign'
    },
    {
        'color' : '#11AA33',
        'title' : 'England',
        'img'   : 'image/eng.png',
        'desc'  : 'The Saint Georges Cross.   In the Union Flag this represents the entire Kingdom of England, including Wales.'
    },
    {
        'color' : '#AA0033',
        'title' : 'france',
        'img'   : 'image/fr.png',
        'desc'  : 'The national flag of France is a tricolour flag featuring three vertical bands coloured blue (hoist side), white, and red'
    },
    {
        'color' : '#99AA23',
        'title' : 'japan',
        'img'   : 'image/japan.png',
        'desc'  : 'The national flag of Japan is a white rectangular flag with a red disc in the center. This flag is officially called Nisshōki'
    },
    {
        'color' : '#11AADD',
        'title' : 'newzealand',
        'img'   : 'image/nz.png',
        'desc'  : 'The flag of New Zealand is a defaced Blue Ensign with the Union Flag in the canton, and four red stars with white borders to the right.'
    },
    {
        'color' : '#DD2333',
        'title' : 'nepal',
        'img'   : 'image/nepal.png',
        'desc'  : 'The national flag of Nepal (Nepali: नेपालको झण्डा) is the worlds only non-quadrilateral national flag. The flag is a simplified combination of two single pennons, the vexillological word for a pennant'
    }
    
    
];
$(document).ready(function (){
    $('#add').click(function(){
        var template = $('#template').html();
        console.log(template);
        Mustache.parse(template);   // optional, speeds up future uses
        console.log(Mustache.parse(template));
        if(count < countryData.length) {
            var rendered = Mustache.render(template, countryData[count]);
            console.log(count);
            //$('#target').append(rendered)
        }else {
            count = 0;
            var rendered = Mustache.render(template, countryData[count]);
            console.log(count);
        }
            $('#target').append(rendered);
            count++;
    });
    
    $('#remove').click(function (){
        $('#tem').remove();
    });
}); 