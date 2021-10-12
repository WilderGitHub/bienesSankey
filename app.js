/* const colors = {
  'environment': '#2b6bf5', //azul  0
  'social': '#53f52b', //verde  1
  'animals': '#97ba4c', //medio amarillo oe  2
  'health': '#f5662b', // rojo naranja  3
  'research_ingredient': '#e102ed', //morado  4
  'fallback': '#f70f26' //ruju  5
}; */

 const colors = {
  
  'fallback': '#2a4d69', //ruju  5
  
  'Capital': '#f37736', //azul  0
  'Deuda': '#009688', //verde  1
  'gce': '#3b5998' //morado  4
}; 

d3.json("datacomersho2.json", function (error, json) {
  let chart = d3.select("#chart").append("svg").chart("Sankey.Path");
  chart
    .name(label)
    .colorNodes(function (name, node) {
      return color(node, 1) || colors.fallback;
    })
    .colorLinks(function (link) {
      return color(link.source, 4) || color(link.target, 1) || colors.fallback;
    })
    .nodeWidth(50)
    .nodePadding(4)
    .spread(true)
    .iterations(0)
    .draw(json);
  
    function label(node) {
    /* return node.name.replace(/\s*\(.*?\)$/, '') + " "+node.monto; */
    return node.name + " "+ node.monto;
  }
  
  function color(node, depth) {
    var id = node.id.replace(/(_score)?(_\d+)?$/, '');
    if (colors[id]) {
      return colors[id];
    } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
      return color(node.targetLinks[0].source, depth - 1);
    } else {
      return null;
    }
  }
});