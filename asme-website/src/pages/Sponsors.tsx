import Layout from "../components/Layout";
import Section from "../components/Section";

const companies =[
  {
    name: "Ansys",
    description: "Thank you for the opportunity to give us the bronze level!",
  }
]

function Sponsors() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#f1f0ea] pt-16 md:pt-24">
        <Section className="bg-transparent py-0">
          <div className="container mx-auto">
            <h1 className="p-10 text-center font-helvetica text-4xl md:text-6xl lg:text-7xl">
              Peterworks
            </h1>
          </div>
        </Section>

        <Section className="bg-transparent pt-4 pb-24 md:pb-32">

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="space-y-6">
              {companies.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-start gap-3 md:gap-4">
                    <img
                      src="/gears.png"
                      alt="Peterworks icon"
                      className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10"
                    />
                    <h3 className="font-helvetica text-xl md:text-3xl">
                      {item.name}
                    </h3>
                  </div>
                  <p className="pl-11 font-helvetica text-base leading-relaxed md:pl-14 md:text-xl">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="https://www.youtube.com/watch?v=OiqO-Q6URTA"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-video w-full overflow-hidden rounded-lg"
            >
              <iframe
                className="pointer-events-none h-full w-full"
                src="https://www.youtube.com/embed/OiqO-Q6URTA?si=MGsnomD-Pi9cKGBI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </a>
          </div>
        </Section>
      </div>
    </Layout>
  );
}

export default Sponsors;
