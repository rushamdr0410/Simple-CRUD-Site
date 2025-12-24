using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using WebAPI.Models;
public class DonationDBContextFactory : IDesignTimeDbContextFactory<DonationDBContext>
{
    public DonationDBContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DonationDBContext>();
        optionsBuilder.UseSqlServer("SERVER=(localdb) ;Database=DonationDB;Trusted_Connection=True;");
        return new DonationDBContext(optionsBuilder.Options);
    }

}

