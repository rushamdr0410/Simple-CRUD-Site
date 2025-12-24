//using Microsoft.EntityFrameworkCore;
//using WebAPI.Models;

//namespace WebAPI
//{
//    public class Startup
//    {
//        public Startup(IConfiguration configuration)
//        {
//            Configuration = configuration;
//        }
//        public IConfiguration Configuration { get; }
//        // This method gets called by the runtime. Use this method to add services to the container.
//        public void ConfigureServices(IServiceCollection services)
//        {

//            services.AddDbContext<DonationDBContext>(options =>
//                options.UseSqlServer(Configuration.GetConnectionString("DevConnection"))
//            );

//            services.AddCors(options =>
//            {
//                options.AddPolicy("AllowReactApp",
//                    builder => builder.WithOrigins("http://localhost:3000")
//                    .AllowAnyMethod()
//                    .AllowAnyHeader()
//                    .AllowCredentials()
//                    .SetIsOriginAllowed((host) => true));
//            });

//            services.AddControllers();
//        }
//        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        {
//            app.UseCors("AllowReactApp");

//            if (env.IsDevelopment())
//            {
//                app.UseDeveloperExceptionPage();
//            }
//            app.UseRouting();
//            app.UseAuthorization();
//            app.UseEndpoints(endpoints =>
//            {
//                endpoints.MapControllers();
//            });
//        }
//    }
//}
