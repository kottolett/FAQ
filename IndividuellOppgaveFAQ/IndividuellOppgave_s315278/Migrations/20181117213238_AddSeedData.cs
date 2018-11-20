using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IndividuellOppgave_s315278.Migrations
{
    public partial class AddSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FAQ",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    question = table.Column<string>(nullable: true, defaultValue: ""),
                    answer = table.Column<string>(nullable: true, defaultValue: ""),
                    asker = table.Column<string>(nullable: true, defaultValue: ""),
                    upVotes = table.Column<int>(nullable: false, defaultValue: 0),
                    totalVotes = table.Column<int>(nullable: false, defaultValue: 0),
                    category = table.Column<string>(nullable: true, defaultValue: "")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQ", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "FAQ",
                columns: new[] { "id", "answer", "asker", "category", "question", "totalVotes", "upVotes" },
                values: new object[,]
                {
                    { 1, "Før du logger inn kan du se hvilke filmer som er til salgs. Ved å trykke Logg inn og fylle inn epost og passord, kan du nå velge å kjøpe filmer, eller du kan administrere dine tidligere kjøp.", "per@hansen.no", "Navigasjon", "Hvordan fungerer filmkjøp?", 15, 12 },
                    { 2, "Trykk på Logg inn-knappen i øvre høyre hjørne, velg Registrer, og fyll ut informasjonen din.", "per@nilsen.no", "Navigasjon", "Hvordan registrerer jeg meg?", 0, 0 },
                    { 3, "Per dags dato er det 24 filmer å velge mellom, men utvalget vokser regelmessig. Følg med!", "nils@hansen.no", "Innhold", "Hvor mange filmer finnes det å velge mellom?", 12, 10 },
                    { 4, "Utvalget vårt avhenger av vår leverandørs rettigheter, men ta kontakt med oss på mail, så kan vi sjekke det opp!", "hans@nilsen.no", "Innhold", "Kan dere skaffe en spesifikk film?", 0, 0 },
                    { 5, "På alle våre filmer kan man velge engelske eller skandinaviske undertekster.", "nils@hansen.no", "Innhold", "Hvilke alternativer finnes for undertekster?", 15, 15 },
                    { 6, "Vi aksepterer Visa, MasterCard, og BankAxept.", "peter@davidson.com", "Faktura", "Hvilke kredittkort kan jeg bruke?", 5, 2 },
                    { 7, "Det er helt trygt å handle av Lunaflick. Vi krypterer all informasjon, og betalingsinformasjonen lagres ikke av oss.", "pierre@chanson.no", "Faktura", "Er det trygt å handle i denne nettbutikken?", 5, 5 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FAQ");
        }
    }
}
