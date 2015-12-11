exports.tally = function(votes) {
  var result = [];

  tallies = {}
  totalVotes = votes.length;

  var vote;
  for (var i = 0 ; i < votes.length ; i++) {
    vote = votes[i];
    if (tallies[vote] == undefined) {
      tallies[vote] = 0
    }
    tallies[vote]++;

    // majority hit, no sense going on
    if (tallies[vote] >= totalVotes / 2) {
      result = [vote];
      break
    }
  }

  if (result.length == 0) {
    var totals = [];
    var temp = {};
    for (key in tallies) {
      if (!temp.hasOwnProperty(tallies[key])) {
        totals.push(tallies[key]);
        temp[tallies[key]] = "got it";
      }
    }

    sorted = totals.sort(function(a,b) {return a - b});

    var lowest;
    temp = {};
    for (var i = sorted.length - 1; result.length < 3 ; i--) {
      for (key in tallies) {
        if (tallies[key] == sorted[i] && result.length < 3 && !temp.hasOwnProperty(key)) {
          result.push(parseInt(key));
          lowest = sorted[i];
          temp[key] = "gotit";
        }
      }
    }

    for (key in tallies) {
      if (tallies[key] == lowest && !temp.hasOwnProperty(key)) {
        result.push(parseInt(key));
        temp[key] = "gotit";
      }
    }
  }

  return result.sort(function(a,b) {return parseInt(a) - parseInt(b)});
}
