using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IndividuellOppgave_s315278.Model
{
    public class FAQModel
    {
        public int id { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public string asker { get; set; }
        public int upVotes { get; set; }
        public int totalVotes { get; set; }
        public string category { get; set; }
    }

    public class FAQContext : DbContext
    {
        public FAQContext(DbContextOptions<FAQContext> options)
        : base(options) { }

        public DbSet<FAQModel> FAQ { get; set; }
    }
}
